class LED(Component):
    def __init__(self,name,limit):
        self.limit=limit
        self.name=name
        self.A=Terminal("p",self) #input
        self.B=Terminal("n",self) #output
 
    def update(self):
        self.B.volt=self.A.volt-3
        self.B.current=self.A.current-3