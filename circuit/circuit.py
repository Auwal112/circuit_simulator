class Circuit:
    def __init__(self):
        self.components = {}
        self.mesh={}
        self.edges={}

    def add(self, component):
        id=component.name
        self.components[id]=component
        #self.mesh[id]=[] #list of ids
        
        
    def connect(self,c1,c2,t_from,t_to):
        t_to.volt=t_from.volt
        t_to.current=t_from.current 
        nextC=t_to.component
        nextC.update()
        if c1.name in self.mesh.keys():
            self.mesh[c1.name].append(c2.name)
        else:
            self.mesh[c1.name]=[c2.name]
            edge_key=c1.name+"_"+c2.name
            self.edges[edge_key]=(t_from,t_to)  # tuple of terminal