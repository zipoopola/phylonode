import React, { useState } from 'react';

function PhyloNode({ name, image, age, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ marginLeft: '20px', borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
      <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer' }}>
        <strong>{name}</strong> {age !== undefined ? `(${age} MYA)` : ''}
        {image && image.trim() !== '' && (
          <img
            src={image}
            alt={name}
            style={{ width: '1000px', marginTop: '5px', display: 'none' }}
            onLoad={(e) => (e.target.style.display = 'block')}
            onError={(e) => (e.target.style.display = 'none')}
          />
        )}
      </div>
      {!collapsed && children && (
        <div>
          {children.map((child, index) => (
            <PhyloNode key={index} {...child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PhyloNode;