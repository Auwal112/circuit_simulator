class Voltage(Component):
    def __init__(self, name, voltage,current=3):
        super().__init__(name)
        self.voltage=voltage
        self.current=current
        self.A = Terminal("n",self) #input  -
        self.B = Terminal("p",self)  #output +   
        #transfer volts and A to posituve terminal
        self.B.volt=voltage
        self.B.current=current
   #     self.A.volt=voltage
        #self.A.current=current
     ##   print(self.B.volt)
        
    def __str__(self):
        return f"{self.name} ({self.voltage} volts)"
        