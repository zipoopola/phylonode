import React, { useState, useRef, useEffect } from "react";
import Tree from 'react-d3-tree';
import data from './data';
import buildTree from './buildTree';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';       // GitHub Flavored Markdown (for lists, tables, etc.)
import remarkBreaks from 'remark-breaks'; // For line breaks with single newlines
import { infoNodes } from './infoList';



const treeData = [buildTree(data)];   //define data

const containerStyles = {
  width: '100%',
  height: '100vh',
};


const renderCustomNode = (setInfoNode) => ({ nodeDatum, toggleNode }) => {
  const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
  const isCollapsed = nodeDatum.__rd3t && nodeDatum.__rd3t.collapsed;

  //if no image present change coords
const nameY = nodeDatum.image ? -56 : -20;
const ageY = nodeDatum.image ? 38 : 0;
const infoiY = nodeDatum.image? -32.5: -12.5;
const infoCircY = nodeDatum.image? -27.5: -7.5;

const chevY = nodeDatum.image? 0: 21;
//const chevX = nodeDatum.image? 0 : 0; unused

const nameLen = (chevY/21)*3.5*(nodeDatum.name.length - 15)
//the chev y /21 becomes a binary switch to avoid moving it if it has image. The 3.5 and 15 are trial and error


  return (
    <g style={{ cursor: hasChildren ? 'pointer' : 'default' }} onClick={hasChildren ? toggleNode : null}>
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
            // whiteSpace: 'normal',
            // wordWrap: 'break-word',        doesnt seem to work rn
            // overflowWrap: 'break-word',
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
            {nodeDatum.age} MYA
          </div>
        </foreignObject>
      )}

      {/* Collapse/expand chevron symbol */}
      {hasChildren && (
        <g
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering node click
            toggleNode();        // toggle expand/collapse
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

      {/* (i) icon which only appears on nodes that have info, which is updated by: npm run infoList*/}
      {infoNodes.has(nodeDatum.name.toLowerCase()) && (
      <g
        onClick={(e) => {
          e.stopPropagation();
          setInfoNode(nodeDatum);
        }}
        style={{ cursor: 'pointer' }}
      >
        <circle cx="-60" cy={infoCircY} r="10" fill="#e5e7eb" stroke="#9ca3af" />
        <foreignObject x="-65" y={infoiY} width="10" height="10">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              fontFamily: 'vivaldi',
              fontSize: '18px',
              textAlign: 'center',
              color: '#374151',
              fontWeight: 700,
              lineHeight: '10px',
              pointerEvents: 'none',
            }}
          >
            i
          </div>
        </foreignObject>
      </g>
      )}
    </g>
  );
};



function App() {
  const [infoNode, setInfoNode] = useState(null);
  const [infoText, setInfoText] = useState('');

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

return (
  <div className="min-h-screen flex flex-col">
    {/* Full-width header */}
    <header className="w-full bg-white shadow-md py-3 px-8">
      <h1 className="text-2xl font-bold text-gray-800">Phylogeny Visualiser</h1>
    </header>

    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <clipPath id="roundedClip">
          <rect x="-60" y="-37.5" width="120" height="75" rx="10" ry="10" />
        </clipPath>
      </defs>
    </svg>

    <main className="flex-grow overflow-auto bg-gray-100 p-1 relative">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full min-w-[800px] min-h-[1200px] overflow-auto"> {/*I changed this to be longer scrolling*/}
        <div className="w-full h-[500vh] overflow-auto"> {/*and changed this to always cover the scrolled section*/}
        <Tree
          data={treeData}
          orientation="vertical"
          zoomable
          collapsible
          translate={{ x: 500, y: 100 }}
          separation={{ siblings: 1, nonSiblings: 1.6 }}
          nodeSize={{ x: 200, y: 145 }}
          renderCustomNodeElement={renderCustomNode(setInfoNode)}
          
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
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-4 border-l border-gray-300 overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the panel
          >

            {/*close button optional*/}
            <button
              className="text-sm text-gray-500 hover:text-gray-800 mb-4"
              onClick={() => setInfoNode(null)}
            >
              Close
            </button>

            {/*node name, image, age are in side bar */}
            <h2 className="text-lg font-semibold mb-2">{infoNode.name}</h2>

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
                Age: {infoNode.age} MYA
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





