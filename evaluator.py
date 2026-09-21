
       

class Circuit:
    def __init__(self):
        self.components = {}
        self.mesh={}
        self.node = None

    def add_component(self, component):
        id=component.name
        self.components[id]=component
        self.mesh[id]=[] #list of ids
        
        
    def connect(self,c1,c2,t1,t2):
        if self.node is None:
            self.node=Node(t1,t2)
            self.mesh[c1.name].append(c2.name)
           # self.mesh[c2.name].append(c1.name)
            return True
        #build graph
        self.mesh[c1.name].append(c2.name)   
        #self.mesh[c2.name].append(c1.name)
        
        n=Node(self.mesh[c1.name],self.mesh[c2.name])
        
        
        

        
        
def traverse(G,s,v):
   if v is None:
       v=set()
   q=[]
   q.append(s)
   while len(q) > 0:
       top=q.pop(0)   
       if top not in v:
           print(top)
           v.add(top)
           for elem in G.meshes[top]:
               q.append(elem)
    
def simulate(C):
    for key in C.edges:
        #get the terminal from
        term_out=C.edges[key].from_t
        #get terminal in
        term_in=C.edges[key].to_t
        a_out,v_out=1,1
    #    print(term_out.component.voltage)
        if isinstance(term_out.component,Voltage):
            v_out=term_out.component.voltage,
            a_out=term_out.component.current
        else:
            if isinstance(term_out.component,Resistor):
                   term_out.component.update()
                   term_in.volt=term_out.voltage
                   
             #      term_in.current=
                   
        
        term_in.volt,term_in.current=v_out,a_out
           #   term_in.component.update()
            
        #v_out,a_out=term_out.volt,term_out.current
#        
#        term_in.volt,term_in.current=v_out,a_out
        
        
        print(v_out,a_out)        
        
        
      
        
        
        
# Create circuit
circuit = Circuit()
r1=Resistor("R1",20)
r2=Resistor("R2",50)
r3=Resistor("R3",30)

circuit.add_component(r1)
circuit.add_component(r2)
circuit.add_component(r3)

#print(circuit.components)

#print(circuit.mesh)

circuit.connect(r1,r2,r1.B,r2.A)
circuit.connect(r2,r3,r2.B,r3.A)
circuit.connect(r3,r1,r3.B,r1.A)

print(circuit.node)





#circuit.components = {
#    "V1": v1,
#    "R1": r1,
#    "R2":r2,
#    "L1":l1
#}

#circuit.edges = {
#    "V1_R1": Edge(v1.B, r1.A),
#    "V1_R2":Edge(v1.A,r2.A),
#    "R1_L1": Edge(r1.B, l1.A),
#    "R2_L1":Edge(r2.B,l1.A),
#    "L1_V1":Edge(l1.B,v1.B)
#}

#circuit.meshes = {
#    "V1":["R1","R2"],
#    "R1":["L1"],
#    "R2":["L1"],
#    "L1":["V1"]
#}


#simulate(circuit)