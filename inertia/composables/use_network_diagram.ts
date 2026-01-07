import { ref, onMounted, onUnmounted, watch, nextTick, type Ref } from 'vue'
import type * as GoJS from 'gojs'

// Lazy load GoJS to avoid SSR issues
let goModule: typeof GoJS | null = null

export interface NetworkNode {
  key: string
  text: string
  level: number
  count?: number
  isRoot?: boolean
  color: string
  gradientStart: string
  gradientEnd: string
  customerId?: number
  customerName?: string
  customerAvatar?: string | null
  status?: string
  totalSpent?: number
  totalOrders?: number
}

export interface NetworkLink {
  from: string
  to: string
}

export interface NetworkTreeData {
  nodes: NetworkNode[]
  links: NetworkLink[]
}

export interface NetworkStats {
  level1Count: number
  level2Count: number
  level3Count: number
  totalNetworkValue: number
  activeMembers: number
  inactiveMembers: number
}

export function useNetworkDiagram(
  containerRef: Ref<HTMLDivElement | null>,
  networkStats: Ref<NetworkStats>,
  networkTree?: Ref<NetworkTreeData | null | undefined>
) {
  const diagram = ref<GoJS.Diagram | null>(null)
  const isInitialized = ref(false)

  const loadGoJS = async (): Promise<typeof GoJS> => {
    if (!goModule) {
      goModule = await import('gojs')
    }
    return goModule
  }

  const createDiagram = async () => {
    if (!containerRef.value) {
      console.warn('Network diagram: Container ref is null')
      return
    }

    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      console.warn('Network diagram: Not in browser environment')
      return
    }

    // Load GoJS
    const go = await loadGoJS()

    // Check if container has dimensions
    const rect = containerRef.value.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) {
      console.warn('Network diagram: Container has no dimensions', rect)
      return
    }

    // Clean up existing diagram
    if (diagram.value) {
      diagram.value.div = null
      diagram.value = null
    }

    const $ = go.GraphObject.make

    // Create the diagram
    const myDiagram = new go.Diagram(containerRef.value, {
      'undoManager.isEnabled': false,
      'animationManager.isEnabled': true,
      'animationManager.duration': 600,
      'layout': new go.TreeLayout({
        angle: 90,
        layerSpacing: 40,
        nodeSpacing: 30,
        arrangement: go.TreeArrangement.Horizontal,
      }),
      'isReadOnly': true,
      'allowSelect': false,
      'allowMove': false,
      'allowCopy': false,
      'allowDelete': false,
      'allowHorizontalScroll': false,
      'allowVerticalScroll': false,
      'allowZoom': false,
      'hasHorizontalScrollbar': false,
      'hasVerticalScrollbar': false,
      'contentAlignment': go.Spot.Center,
      'padding': 10,
      'toolManager.mouseWheelBehavior': go.WheelMode.None,
    })

    // Set dark background
    myDiagram.div!.style.backgroundColor = 'transparent'

    // Define the node template for root (YOU)
    const rootTemplate = $(
      go.Node,
      'Vertical',
      { locationSpot: go.Spot.Center },
      // Glow effect panel
      $(
        go.Panel,
        'Auto',
        // Outer glow
        $(go.Shape, 'RoundedRectangle', {
          fill: new go.Brush('Linear', {
            0: 'rgba(139, 92, 246, 0.4)',
            1: 'rgba(168, 85, 247, 0.4)',
          }),
          stroke: null,
          width: 66,
          height: 66,
          parameter1: 14,
        }),
        $(
          go.Panel,
          'Auto',
          // Main shape
          $(go.Shape, 'RoundedRectangle', {
            fill: new go.Brush('Linear', {
              0: 'rgb(139, 92, 246)',
              0.5: 'rgb(147, 51, 234)',
              1: 'rgb(168, 85, 247)',
            }),
            stroke: 'rgba(255, 255, 255, 0.2)',
            strokeWidth: 2,
            width: 52,
            height: 52,
            parameter1: 12,
            shadowVisible: true,
          }),
          // Crown icon using text
          $(go.TextBlock, '👑', {
            font: '22px sans-serif',
            stroke: 'white',
            margin: 8,
          })
        )
      ),
      // Label
      $(
        go.TextBlock,
        {
          margin: new go.Margin(8, 0, 2, 0),
          font: 'bold 11px Inter, system-ui, sans-serif',
          stroke: 'white',
        },
        new go.Binding('text', 'text')
      ),
      // Subtitle
      $(go.TextBlock, 'Network Leader', {
        font: '9px Inter, system-ui, sans-serif',
        stroke: 'rgb(107, 114, 128)',
      })
    )

    // Define the node template for level summary nodes
    const levelTemplate = $(
      go.Node,
      'Vertical',
      { locationSpot: go.Spot.Center },
      $(
        go.Panel,
        'Auto',
        // Main shape with gradient
        $(
          go.Shape,
          'RoundedRectangle',
          {
            width: 40,
            height: 40,
            parameter1: 10,
            strokeWidth: 0,
            shadowVisible: true,
          },
          new go.Binding('fill', '', (data) => {
            return new go.Brush('Linear', {
              0: data.gradientStart,
              1: data.gradientEnd,
            })
          })
        ),
        // Level text
        $(
          go.TextBlock,
          {
            font: 'bold 12px Inter, system-ui, sans-serif',
            stroke: 'white',
            margin: 6,
          },
          new go.Binding('text', 'text')
        )
      ),
      // Level label
      $(
        go.TextBlock,
        {
          margin: new go.Margin(5, 0, 1, 0),
          font: '9px Inter, system-ui, sans-serif',
          stroke: 'rgb(156, 163, 175)',
        },
        new go.Binding('text', 'level', (l) => `Level ${l}`)
      ),
      // Count
      $(
        go.TextBlock,
        {
          font: 'bold 13px Inter, system-ui, sans-serif',
        },
        new go.Binding('text', 'count', (c) => c?.toString() || '0'),
        new go.Binding('stroke', 'color')
      )
    )

    // Define the node template for individual member nodes (from database)
    const memberTemplate = $(
      go.Node,
      'Vertical',
      { locationSpot: go.Spot.Center },
      $(
        go.Panel,
        'Auto',
        // Main shape with gradient based on status
        $(
          go.Shape,
          'RoundedRectangle',
          {
            width: 36,
            height: 36,
            parameter1: 8,
            strokeWidth: 1,
            shadowVisible: true,
          },
          new go.Binding('fill', '', (data) => {
            return new go.Brush('Linear', {
              0: data.gradientStart,
              1: data.gradientEnd,
            })
          }),
          new go.Binding('stroke', 'status', (s) => {
            return s === 'active' ? 'rgb(52, 211, 153)' : 'rgb(107, 114, 128)'
          })
        ),
        // Member initial or avatar placeholder
        $(
          go.TextBlock,
          {
            font: 'bold 14px Inter, system-ui, sans-serif',
            stroke: 'white',
            margin: 4,
          },
          new go.Binding('text', 'text')
        )
      ),
      // Member name
      $(
        go.TextBlock,
        {
          margin: new go.Margin(4, 0, 0, 0),
          font: '8px Inter, system-ui, sans-serif',
          stroke: 'rgb(156, 163, 175)',
          maxSize: new go.Size(60, Number.NaN),
          wrap: go.Wrap.None,
          overflow: go.TextOverflow.Ellipsis,
        },
        new go.Binding('text', 'customerName')
      )
    )

    // Use template map
    const templmap = new go.Map<string, go.Node>()
    templmap.add('root', rootTemplate)
    templmap.add('level', levelTemplate)
    templmap.add('member', memberTemplate)
    myDiagram.nodeTemplateMap = templmap

    // Define link template
    myDiagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Routing.Orthogonal,
        corner: 8,
        curve: go.Curve.JumpOver,
      },
      $(go.Shape, {
        strokeWidth: 2,
        stroke: new go.Brush('Linear', {
          0: 'rgb(139, 92, 246)',
          1: 'rgba(139, 92, 246, 0.3)',
        }),
      })
    )

    diagram.value = myDiagram

    // Set initial data first before marking as initialized
    updateDiagramData()

    // Mark as initialized after diagram is fully set up
    // Use nextTick to avoid conflicts with Vue's reactivity
    await nextTick()
    isInitialized.value = true
  }

  const updateDiagramData = () => {
    if (!diagram.value || !goModule) return

    const go = goModule
    const stats = networkStats.value
    const tree = networkTree?.value

    let nodeDataArray: any[]
    let linkDataArray: NetworkLink[]

    // If we have tree data from database, use it
    if (tree && tree.nodes && tree.nodes.length > 0) {
      console.log('[NetworkDiagram] Using tree data from database:', tree.nodes.length, 'nodes')
      console.log('[NetworkDiagram] Nodes:', JSON.stringify(tree.nodes, null, 2))
      console.log('[NetworkDiagram] Links:', JSON.stringify(tree.links, null, 2))

      // Use actual network tree from database
      nodeDataArray = tree.nodes.map((node) => {
        // Determine the category based on node properties
        let category = 'member'
        if (node.isRoot) {
          category = 'root'
        }

        return {
          ...node,
          category,
          // Ensure text is set for member nodes (use first letter of name if not set)
          text: node.text || (node.customerName ? node.customerName.charAt(0).toUpperCase() : 'U'),
        }
      })
      linkDataArray = tree.links || []
    } else {
      console.log('[NetworkDiagram] Using fallback summary view')
      // Fallback to summary view with level counts
      nodeDataArray = [
        {
          key: 'root',
          text: 'YOU',
          level: 0,
          isRoot: true,
          category: 'root',
          color: 'rgb(139, 92, 246)',
          gradientStart: 'rgb(139, 92, 246)',
          gradientEnd: 'rgb(168, 85, 247)',
        },
        {
          key: 'level1',
          text: 'L1',
          level: 1,
          count: stats.level1Count,
          category: 'level',
          color: 'rgb(34, 211, 238)',
          gradientStart: 'rgb(34, 211, 238)',
          gradientEnd: 'rgb(59, 130, 246)',
        },
        {
          key: 'level2',
          text: 'L2',
          level: 2,
          count: stats.level2Count,
          category: 'level',
          color: 'rgb(192, 132, 252)',
          gradientStart: 'rgb(192, 132, 252)',
          gradientEnd: 'rgb(236, 72, 153)',
        },
        {
          key: 'level3',
          text: 'L3',
          level: 3,
          count: stats.level3Count,
          category: 'level',
          color: 'rgb(251, 191, 36)',
          gradientStart: 'rgb(251, 191, 36)',
          gradientEnd: 'rgb(249, 115, 22)',
        },
      ]

      linkDataArray = [
        { from: 'root', to: 'level1' },
        { from: 'root', to: 'level2' },
        { from: 'root', to: 'level3' },
      ]
    }

    diagram.value.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)

    // Force layout update
    diagram.value.layoutDiagram(true)
  }

  const updateDiagram = async () => {
    updateDiagramData()
  }

  onMounted(() => {
    // Wait for next tick and small delay to ensure container is rendered
    nextTick(() => {
      setTimeout(() => {
        createDiagram()
      }, 200)
    })
  })

  // Also watch for container ref changes
  watch(
    containerRef,
    (newVal) => {
      if (newVal && !diagram.value) {
        nextTick(() => {
          setTimeout(() => {
            createDiagram()
          }, 100)
        })
      }
    },
    { immediate: true }
  )

  onUnmounted(() => {
    if (diagram.value) {
      diagram.value.div = null
      diagram.value = null
    }
  })

  watch(networkStats, () => updateDiagram(), { deep: true })

  if (networkTree) {
    watch(networkTree, () => updateDiagram(), { deep: true })
  }

  // Function to manually initialize/reinitialize diagram
  const initDiagram = async () => {
    if (containerRef.value) {
      // Clean up existing diagram first
      if (diagram.value) {
        diagram.value.div = null
        diagram.value = null
        isInitialized.value = false
      }
      await createDiagram()
    }
  }

  return {
    diagram,
    isInitialized,
    updateDiagram,
    initDiagram,
  }
}
