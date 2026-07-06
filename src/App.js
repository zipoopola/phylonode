import { useState, useEffect, useRef, useCallback } from "react";
import Tree from 'react-d3-tree';
import data from './data';
import buildTree from './buildTree';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';       // GitHub Flavored Markdown (for lists, tables, etc.)
import remarkBreaks from 'remark-breaks'; // For line breaks with single newlines
import { infoNodes } from './infoList';
import Fuse from 'fuse.js'; // better search function



const treeData = [buildTree(data)];   //define data

//new function to expand all node descendants. recursively set collapsed = false on all descendants
function expandAllDescendants(node) {
  if (!node) return;
  if (node.__rd3t) {
    node.__rd3t.collapsed = false;
  }
  if (node.children) {
    node.children.forEach(expandAllDescendants);
  }
  // Also expand _collapsed children (react-d3-tree moves children here when collapsed)
  if (node.__rd3t && node.__rd3t.collapsed === false && node._children) {
    node.children = node._children;
    node._children = null;
    node.children.forEach(expandAllDescendants);
  }
}

const dataByName = {}; //extracts all data from a node
data.forEach(item => { dataByName[item.name] = item; });


const renderCustomNode = (setInfoNode, onExpandAll, nodePositions, panToNode) => ({ nodeDatum, toggleNode, hierarchyPointNode }) => {
//early retuen for unnamed nodes, lines and dot in middle. If it has an age, this is displayed instead of the dot
if (nodeDatum.unnamed) {
  const hasAge = nodeDatum.age && nodeDatum.age !==0;
  return (
    <g onClick={toggleNode} style = {{ cursor: 'pointer'}}>
      <line x1="0" y1="-55" x2="0" y2={hasAge? -15:55} stroke = "#4B5563" strokeWidth="2" />
      {hasAge && (
        <>
          <line x1="0" y1="15" x2="0" y2="55" stroke = "#4B5563" strokeWidth="2" />
          <foreignObject x="-40" y="-12" width="80" height="24">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '11px',
                fontWeight: 300,
                lineHeight: '24px',
              }}
            >
              {nodeDatum.ageEnd ? `${nodeDatum.age}–${nodeDatum.ageEnd} MYA` : `${nodeDatum.age} MYA`}
            </div>
          </foreignObject>
        </>
      )}
      {!hasAge && <circle r="4" fill="#9ca3af" />} 
    </g>
  );
}


  // record node postion for search panning
if (hierarchyPointNode) {
  nodePositions.current[nodeDatum.name] = {x: hierarchyPointNode.x, y: hierarchyPointNode.y};
}
const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
const isCollapsed = nodeDatum.__rd3t && nodeDatum.__rd3t.collapsed;

  // detect if children are very far apart and show navigation labels
const leftChild = nodeDatum.children?.[0];
const rightChild = nodeDatum.children?.[nodeDatum.children.length - 1];  //rightmost is final child in length of list
const leftPos = leftChild ? nodePositions.current[leftChild.name] : null;
const rightPos = rightChild ? nodePositions.current[rightChild.name] : null;
const spread = leftPos && rightPos ? rightPos.x - leftPos.x : 0; //calculates spread, for use in panning and making website more visibly nice
const SPREAD_THRESHOLD = 1000;
const showSpreadLabels = spread > SPREAD_THRESHOLD && !isCollapsed;
const parentPos = hierarchyPointNode ? { x: hierarchyPointNode.x, y: hierarchyPointNode.y } : null;
const leftRelX = parentPos && leftPos ? leftPos.x - parentPos.x : 0;   //relative children positions
const rightRelX = parentPos && rightPos ? rightPos.x - parentPos.x : 0;

  //if no image present change coords
const nameY = nodeDatum.image ? -56 : -20;
const ageY = nodeDatum.image ? 38 : 0;
const infoiY = nodeDatum.image? -32.5: -12.5;
const infoCircY = nodeDatum.image? -27.5: -7.5;
const chevY = nodeDatum.image? 0: 21;
//const chevX = nodeDatum.image? 0 : 0; unused

const nameLen = (chevY/21)*3.5*(nodeDatum.name.length - 15)
//the chev y /21 becomes a binary switch to avoid moving chevron if node has image. The 3.5 and 15 are trial and error to move chevron to end of name

const handleToggle = () => {
  // If we're about to expand (currently collapsed), expand all descendants too
  if (isCollapsed) {
    onExpandAll(nodeDatum);
  }
  toggleNode();
};

  return (
    <g style={{ cursor: hasChildren ? 'pointer' : 'default' }} onClick={hasChildren ? handleToggle : null}>
      {/* hover highlight*/}
      {/* {hasChildren && (
        <circle
        r="45"
        className="node-highlight"
        stroke="transparent"
      />
    )}                                                  WIP */}



      {/* Name above */}
      <foreignObject x="-75" y={nameY} width="150" height="20">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            textAlign: 'center',
            color: '#111827',
            fontSize: '14px',
            fontWeight: 100,
            lineHeight: '1.2em',
          }}
        >
          {nodeDatum.name}
        </div>
      </foreignObject>

      {/* Image*/}
      {nodeDatum.image && (
        <image
          href={`/${nodeDatum.image}`}
          x="-60"
          y="-37.5"
          height="75"
          width="120"
          rx="10"
          ry="10"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#roundedClip)"
        />
      )}

      {/* Age below */}
      {nodeDatum.age && (
        <foreignObject x="-60" y={ageY} width="120" height="20">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '12px',
              fontWeight: 300,
              lineHeight: '1.2em',
            }}
          >
            {nodeDatum.ageEnd? `${nodeDatum.age}-${nodeDatum.ageEnd} MYA` : `${nodeDatum.age} MYA`}
          </div>
        </foreignObject>
      )}

      {/* Collapse/expand chevron symbol */}
      {hasChildren && (
        <g
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering node click
            handleToggle();        // toggle expand/collapse
          }}
        >
          {isCollapsed ? (
            <polyline
              points={`${62+nameLen},-34 ${66+nameLen},-37.5 ${70+nameLen},-34`}
              fill="none"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(0, ${chevY})`}

            />
          ) : (
            <polyline
              points={`${62+nameLen},-34 ${66+nameLen},-29.5 ${70+nameLen},-34`}
              fill="none"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(0, ${chevY})`}

            />
          )}
        </g>
      )}

      {/* new shiny (i) icon appears for infonodes, all else have the basic version - this is updated by --- npm run infoList ---*/}
      {(() => {
        const hasInfo = infoNodes.has(nodeDatum.name.toLowerCase());
        const r = hasInfo ? 11 : 10; //(i) icon is larger if it has info
        return (
        <g
          onClick={(e) => {
            e.stopPropagation();
            setInfoNode(nodeDatum);
          }}
          style={{ cursor: 'pointer' }}
        >
           <circle cx="-60" cy={infoCircY} r={r} fill={hasInfo ? '#7DD3FC' : '#e5e7eb'}    //position, size, and inner colour
           stroke={hasInfo ? "#0284C7   ":"#9ca3af"} strokeWidth={hasInfo ? 1.5:1}                   //border colour and thickness
           />
           <foreignObject x="-65" y={infoiY} width="10" height="10">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              fontFamily: 'vivaldi',
              fontSize: hasInfo ? '21px' : '18px',
              textAlign: 'center',
              color: hasInfo? '#374151' : '#374151',
              fontWeight: 700,
              lineHeight: '10px',
              pointerEvents: 'none',
            }}
          >
            i
          </div>
        </foreignObject>
        </g>
        );
      })()}
            {showSpreadLabels && (        //navi labels for widely distanced children
        <>
          <foreignObject
            x="-150"
            y="55"
            width="140"
            height="20"
            onClick={(e) => {
              e.stopPropagation();
              panToNode(leftChild);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                textAlign: 'right',
                fontSize: '11px',
                color: '#6b7280',
                fontWeight: 300,
                lineHeight: '20px',
              }}
            >
              ← {leftChild.name}
            </div>
          </foreignObject>

          <foreignObject
            x="10"
            y="55"
            width="140"
            height="20"
            onClick={(e) => {
              e.stopPropagation();
              panToNode(rightChild);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                textAlign: 'left',
                fontSize: '11px',
                color: '#6b7280',
                fontWeight: 300,
                lineHeight: '20px',
              }}
            >
              {rightChild.name} →
            </div>
          </foreignObject>

          {/* parent back-labels, positioned above each child */}
          <foreignObject
            x={leftRelX + 10}
            y="55"
            width="140"
            height="20"
            onClick={(e) => {
              e.stopPropagation();
              panToNode(nodeDatum); // pan back to this node (the parent)
            }}
            style={{ cursor: 'pointer' }}
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                textAlign: 'left',
                fontSize: '11px',
                color: '#6b7280',
                fontWeight: 300,
                lineHeight: '20px',
              }}
            >
              → {nodeDatum.name}
            </div>
          </foreignObject>

          <foreignObject
            x={rightRelX - 150}
            y="55"
            width="140"
            height="20"
            onClick={(e) => {
              e.stopPropagation();
              panToNode(nodeDatum); // pan back to this node (the parent)
            }}
            style={{ cursor: 'pointer' }}
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                textAlign: 'right',
                fontSize: '11px',
                color: '#6b7280',
                fontWeight: 300,
                lineHeight: '20px',
              }}
            >
              ← {nodeDatum.name}
            </div>
          </foreignObject>
        </>
      )}
    </g>
  );
};


const isMobile = window.innerWidth < 768; // is the user on mobile? (narrow screen)

function App() {
  const [infoNode, setInfoNode] = useState(null);
  const [infoText, setInfoText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const treeContainerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: window.innerWidth / 2, y: 100 }); //beggining translate (changed by search fn) x is set relative to screen width
  const nodePositions = useRef({}); //variable to store position of searched node
  const animationRef = useRef(null); //variable to track search panning animation
  const translateRef = useRef(translate); // avoids declaring translate as a dependencey
  const initialZoom= 0.35*window.innerWidth / 1200 + 0.24;  //initial zoom, 0.59 for the largest screens, or more zoomed out on smaller screens
  const [currentZoom, setCurrentZoom] = useState(initialZoom);
  const currentZoomRef = useRef(initialZoom);

  useEffect(() => {
  translateRef.current = translate;
  }, [translate]);       //keeps translate ref in sync
  useEffect(() => {
  currentZoomRef.current = currentZoom; //same for zoom
}, [currentZoom]);

  //stopped scroll wheel being allowed to move page down (it can only be used for zoom)
  useEffect(() => {
  const el = treeContainerRef.current;
  if (!el) return;
  const handler = (e) => e.preventDefault();
  el.addEventListener('wheel', handler, { passive: false });
  return () => el.removeEventListener('wheel', handler);
}, []);

// white rectangle behind tree so dark background shows when panning away - vignette
useEffect(() => {
  const treeGroup = treeContainerRef.current?.querySelector('.rd3t-g');
  if (!treeGroup) return;

  const bounds = getTreeBounds();
  const padding = 5800;

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <radialGradient id="fadeGrad" cx="50%" cy="50%" r="50%">
      <stop offset="55%" stop-color="white" stop-opacity="1"/>   
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
  `;

  //change how far out the fade starts with the first number - basically changes how large an area the fade is over (for a given size)
  //it feels like less than 40% fades too slowly

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', bounds.minX - padding);
  rect.setAttribute('y', bounds.minY - padding);
  rect.setAttribute('width', bounds.maxX - bounds.minX + padding * 2);
  rect.setAttribute('height', bounds.maxY - bounds.minY + padding * 2);
  rect.setAttribute('fill', 'url(#fadeGrad)');

  treeGroup.insertBefore(defs, treeGroup.firstChild);
  treeGroup.insertBefore(rect, treeGroup.firstChild);
}, []);

useEffect(() => {
  if (isMobile && infoNode) {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  } else {
    document.body.style.overflow = '';      //stops touching and scrolling allowed when infoNode open
    document.body.style.touchAction = '';
  }
  return () => {
    document.body.style.overflow = '';    //restored touch ability when infoNode not open
    document.body.style.touchAction = '';
  };
}, [infoNode]);


// Called when a collapsed node is about to be expanded —
// pre-marks all its descendants as expanded so react-d3-tree renders them open.
const handleExpandAll = (nodeDatum) => {
  if (nodeDatum.children) {
    nodeDatum.children.forEach(expandAllDescendants);
  }
};

const getTreeBounds = () => {               //helper function for tree bounds based on maximum node positions
  const positions = Object.values(nodePositions.current);
  if (positions.length === 0) return { minX: -2000, maxX: 2000, minY: -200, maxY: 10000 };
  return {
    minX: Math.min(...positions.map(p => p.x)),
    maxX: Math.max(...positions.map(p => p.x)),
    minY: Math.min(...positions.map(p => p.y)),
    maxY: Math.max(...positions.map(p => p.y)),
  };
};

//defined a function for panning. before this was within the search fn, but now it needs using from the sidebar breadcrumbs too, so to not replicate code:
const panToNode = useCallback((node) => {          
  const pos = nodePositions.current[node.name];
  if (pos){
    const treeGroup = treeContainerRef.current?.querySelector('.rd3t-g');
    if (!treeGroup) return;

    // read current scale from DOM
    const transform = treeGroup.getAttribute('transform');
    const scaleMatch = transform?.match(/scale\(([^)]+)\)/);
    const currentScale = scaleMatch ? parseFloat(scaleMatch[1]) : currentZoomRef.current;

    // set currentZoom to match actual scale so react-d3-tree doesn't snap it on re-render
    setCurrentZoom(currentScale);

    const targetX = window.innerWidth/2.5 - pos.x * currentScale;
    const targetY = 275 - pos.y * currentScale;

    // add CSS transition temporarily
    treeGroup.style.transition = 'transform 1s cubic-bezier(0.45, 0, 0.55, 1)';
    setTranslate({ x: targetX, y: targetY });

    // remove transition after animation completes so normal panning isn't sluggish
    setTimeout(() => {
      treeGroup.style.transition = '';
    }, 1000);
  }
}, []);

useEffect(() => {
  if (infoNode && infoNode.info) {
    fetch(infoNode.info)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((text) => setInfoText(text))
      .catch((err) => {
        console.error("Failed to load info text:", err);
        setInfoText('Failed to load info.');
      });
  } else {
    setInfoText('');
  }
}, [infoNode]);

//search function using Fuse Library
useEffect(() => {
    if (!searchQuery) return;
    const delay = setTimeout(() => {     //delay to not debounce     
      function findNode(node, targetName) {
      if (node.name === targetName) return node;
      if (node.children) {
        for (const child of node.children) {
          const result = findNode(child, targetName);
          if (result) return result;
        }
      }
      return null;
    }

    const allNodes = Object.keys(nodePositions.current).flatMap(name => {
    const entry = dataByName[name];
    const akaEntries = entry?.aka ? entry.aka.map(a => ({ name: a, realName: name })) : [];
    return [{ name, realName: name }, ...akaEntries];
  });

    const fuse = new Fuse(allNodes, {
      keys: ['name'],
      threshold: 0.5,   //0 is strict, 1 is loose
      ignoreLocation: true,
    });

    const results = fuse.search(searchQuery);
    const matchedNode = results.length > 0 ? findNode(treeData[0], results[0].item.realName) : null;

    if (matchedNode) {
      if (!isMobile) setInfoNode(matchedNode); // opens the sidebar for the matched node only if not on mobile (too little space)
      panToNode(matchedNode); //this is the whole function to pan to the named node
    }
  }, 500); // 0.5 second    *** set to zero to bring back debounce
  return () => clearTimeout(delay); // cancel if user types again before 1s is up     

}, [searchQuery, panToNode]);

function findPath(node, targetName, path = []){
  const currentPath = [...path, node];
  if (node.name === targetName) return currentPath;   //starts at top and looks down trying to find the node in question. It adds the node each time as it goes down
  if (node.children) {
    for (const child of node.children) {
      const result = findPath(child, targetName, currentPath);     //current path gets passed down as it looks downwards
      if (result) return result;
    }
  }
  return null;   //if it looks in the wrong direction, don't return anything
}

return (
  <div className="min-h-screen flex flex-col">
    {/* Full-width header */}
    <header className="w-full bg-white shadow-md py-2 px-8 flex items-center gap-6 sticky top-0 z-30 md:relative">      {/*sticky top-0 z-30 makes top stick, md:relative overrites this for larger screens*/}
      <h1 className="text-2xl font-bold text-gray-800">Phylogeny Visualiser</h1>

    {/* Return home */}
      <button
        onClick={() => {
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          panToNode(treeData[0]);
        }}
        className="text-gray-500 hover:text-gray-800 transition-colors text-xl"
        title="Return to start"
      >
        ⌂
      </button>


    {/* Searchbar */}      
      <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="border rounded-md px-3 py-1 text-sm focus:outline-none"
    />
    </header>

    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <clipPath id="roundedClip">
          <rect x="-60" y="-37.5" width="120" height="75" rx="10" ry="10" />
        </clipPath>
      </defs>
    </svg>

    <main className="flex-grow overflow-auto bg-gray-100 p-1 relative">
      <div className="bg-white rounded-xl shadow-xl p-1 w-full min-w-[800px] min-h-[1200px] overflow-auto"> {/*I changed this to be longer scrolling and reduced padding for mobile experience*/}
        <div className="w-full h-[500vh] rounded-xl shadow-xl overflow-auto bg-gray-900" ref={treeContainerRef}> {/*and changed this to always cover the scrolled section*/}
        <Tree
          data={treeData}
          orientation="vertical"
          zoomable 
          // draggable={false} //disabling native pan cuz i will make my own with boundaries
          zoom={currentZoom}  
          scaleExtent={{ min: 0.1, max: 4.5 }} //allowed zooms
          collapsible
          translate={translate}
          separation={{ siblings: 1, nonSiblings: 1.6 }}
          nodeSize={{ x: 200, y: 145 }}
          renderCustomNodeElement={renderCustomNode(setInfoNode, handleExpandAll, nodePositions, panToNode)}
          
          pathFunc={(linkData) => {
          const offsetY = 55; // Adjust this if your node has a taller label or extra info
          const source = { ...linkData.source, y: linkData.source.y + offsetY };
          const target = { ...linkData.target, y: linkData.target.y - offsetY };

          return `M${source.x},${source.y}V${(source.y + target.y) / 2}H${target.x}V${target.y}`;
        }}
        />
        </div>
      </div>


      {infoNode && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setInfoNode(null)}
        >
          {/*above sets an overlay, that when clicked, closes any sidebar*/}
          {/* Sidebar panel charactersitics, when clicked inside, it doesn't propagate to outside code (hence doesnt close)*/}
          <div
          className={isMobile?
            "absolute bottom-0 left-0 w-full h-2/5  bg-white shadow-lg p-4 border-t border-gray-300 overflow-y-auto z-50 rounded-t-2xl"  //bottom border for mobile
            :"absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-4 border-l border-gray-300 overflow-y-auto z-50"
            }
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the panel
          >
            {/* drag handle for mobile */}
            {isMobile && (
              <div className="flex justify-center mb-3">
                <div className="w-10 h-1 bg-gray-300 rounded-full"/>
              </div>
            )}

            {/*close button*/}
            <button
              className="text-sm text-gray-500 hover:text-gray-800 mb-4"
              onClick={() => setInfoNode(null)}
            >
              Close
            </button>

            {/* breadcrumbs*/}
            {(() => {
              const path = findPath(treeData[0], infoNode.name) || [];
              const crumbs = path.filter(n => n.rank); // only nodes with a rank in data.js get added to the crumbs list
              return crumbs.length > 0 && (
                <div className="text-xs text-gray-400 mb-2 flex flex-wrap gap-1">
                  {crumbs.map((n, i) => (
                    <span
                      key={n.name}
                      onClick={() => {
                        setInfoNode(n);
                        panToNode(n);
                      }}
                      className="cursor-pointer hover:text-gray-600 transition-colors"
                    >
                      {n.name}{i < crumbs.length - 1 ? ' →' : ''}        {/*adds arrows between each crumb not after the end one tho */}
                    </span>
                  ))}
                </div>
              );
            })()}

            {/*node name, image, age are in side bar */}
            <h2 className="text-lg font-semibold mb-2">{infoNode.name}</h2>
            {infoNode.aka && infoNode.aka.length > 0 && (         //aka names added
              <p className="text-xs text-gray-400 mb-2 italic">
                aka {infoNode.aka.join(', ')}
              </p>
            )}

            {infoNode.image && (
              <img
                src={`/${infoNode.image}`}
                alt={infoNode.name}
                className="w-full rounded-md mb-4 border border-gray-300"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
            )}

            {infoNode.age && (
              <p className="text-sm text-gray-600 mb-1">
                Age: {infoNode.ageEnd? `${infoNode.age}-${infoNode.ageEnd} MYA` : `${infoNode.age} MYA`} 
              </p>
            )}

          <div className="prose text-sm mt-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
            >
              {infoText}
            </ReactMarkdown>
          </div>
              
          </div>
        </div>
      )}
    </main>
  </div>
  );
}


export default App;





