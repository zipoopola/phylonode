import React from 'react';
import Tree from 'react-d3-tree';
import data from './data';
import buildTree from './buildTree';
//import PhyloNode from './PhyloNode';

const treeData = [buildTree(data)];   //define data

const containerStyles = {
  width: '100%',
  height: '100vh',
};


const renderCustomNode = ({ nodeDatum, toggleNode }) => {               //to render nodes
  const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
  const isCollapsed = nodeDatum.__rd3t && nodeDatum.__rd3t.collapsed;     //using trees internal update state to tell if collapse or not (given that it exists)

  return (
    <g 
    //make node clickable if it has children
    style={{ cursor: hasChildren ? 'pointer' : 'default' }} onClick={hasChildren ? toggleNode : null}>


    {/* Name above (HTML via foreignObject) */}
    <foreignObject x="-60" y="-57.5" width="120" height="20">
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


      {/* Image as main node rectangle */}
      {nodeDatum.image ? (
        <image
          href={`/${nodeDatum.image}`}
          x="-60" y="-37.5" height="75" width="120" rx="10" ry="10"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#roundedClip)"
        />
    ) : (
      <rect
        width="120" height="75" x="-60" y="-37.5" fill="#f3f4f6" stroke="#9ca3af" rx="10" ry="10"
      />
    )}


    {/* Age below (HTML via foreignObject) */}
    {nodeDatum.age && (
      <foreignObject x="-60" y="40" width="120" height="20">
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


      {/*+- symbol for collapsible */}
      {hasChildren && (
        <text
          x="60" y="-37.5" textAnchor="middle" fontSize="18" fill="#374151" fontWeight="10" pointerEvents="none"
        >
          {isCollapsed ? '+' : '−'}
        </text>
      )}
    </g>
  );
};



function App() {
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

      <main className="flex-grow overflow-auto bg-gray-100 p-8">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full min-w-[800px] min-h-[600px] overflow-auto">
          <div className="w-full h-[80vh] overflow-auto">
            <Tree
              data={treeData}
              orientation="vertical"
              zoomable
              collapsible
              translate={{ x: 500, y: 100 }}
              separation={{ siblings: 1, nonSiblings: 1.75 }}
              nodeSize={{ x: 200, y: 120 }}
              renderCustomNodeElement={renderCustomNode}
              pathFunc="straight"
            />
          </div>
        </div>
      </main>
    </div>
  );
}


export default App;





