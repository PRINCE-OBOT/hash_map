class Node {
  constructor(key = null, nextNode = null) {
    this.key = key;
    this.nextNode = nextNode;
  }
}

class NodeWithValue extends Node {
  constructor(key = null, value = null, nextNode = null) {
    super(key, nextNode);
    this.value = value;
  }
}

export { Node, NodeWithValue };
