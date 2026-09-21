


circuit = Circuit()
v1 = Voltage("V1", 12)

r1 = Resistor("R1", 5/50)
#r2=Resistor("R2",5/50)
l1=LED("L1",30)

circuit.add(v1)
circuit.add(r1)
#circuit.add(r2)
circuit.add(l1)

circuit.connect(v1,r1,v1.B,r1.A)
#circuit.connect(v1,r2,v1.B,r2.A)
circuit.connect(r1,l1,r1.B,l1.A)
#circuit.connect(r2,l1,r2.B,l1.A)
circuit.connect(l1,v1,l1.B,v1.B)
move_energy(circuit.edges['V1_R1'])