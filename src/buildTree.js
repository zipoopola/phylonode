//This converts flat data into tree structure

export default function buildTree(flatData) {
  const nodes = {};
  let root = null;

  // First pass: create all nodes
  flatData.forEach(item => {
    nodes[item.name] = { ...item, children: [] };
  });

  // Second pass: assign children to parents
  flatData.forEach(item => {
    if (item.parent) {
      nodes[item.parent].children.push(nodes[item.name]);
    } else {
      root = nodes[item.name];
    }
  });


  return root;
}