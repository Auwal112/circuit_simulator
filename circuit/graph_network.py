
class GraphNetwork:
    def __init__(self):
        self.adjList={}
        self.object_ref={}
        self.edges={}
    def get_map(self):
         return self.adjList
    def get_reference_dict(self):
        return self.object_ref
    def get_edges(self):
        return self.edges
    def get_node(self,key):
        return self.object_ref[key]
        
                      
    def add_node(self,key,obj):
         self.object_ref[key]=obj
         
    def connect_node(self,key0,key1):
         if key0 in self.adjList:
             self.adjList[key0].append(key1)
             return True
         self.adjList[key0]=[key1]    
              
                                                                                                  
    def connect_edge(self,edge1,edge2):
        key=edge1.name+"_"+edge2.name
        self.edges[key]=(edge1,edge2)                                                                      
    def get_previous_node(self,node_key):
         parent=[]
         for key in self.adjList.keys():
              if node_key in self.adjList[key]:
                   parent.append(key)
         return parent
 
    def get_next_node(self,node_key):
        return self.adjList[node_key]
        
    def get_node_sibling(self,node_key):
         prev_key=self.get_previous_node(node_key)
         sib=[]
         for elem in self.adjList[prev_key[0]]:
             if not self.object_ref[elem].name == self.object_ref[node_key].name:
                 sib.append(elem)
         return sib   
                             