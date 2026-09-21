class Resistor(Component):
    def __init__(self, name, resistance=1):
        super().__init__(name)
        self.resistance = resistance
        self.A= Terminal("in",self) #input
        self.B= Terminal("out",self)#output
        
    def __str__(self):
        return f"{self.name} ({self.resistance} Ω)"
        
    def update(self):
        #calculate output voltage and current of the resistor 
        #pass the value to thevoutput terminal
        
        self.B.volt=self.A.current/self.resistance
        self.B.current=self.A.volt*self.resistance
        
        