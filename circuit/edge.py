class Edge:
    """name is component name like R1"""
    def __init__(self,f,t):
        self.voltage=0
        self.from_t=f
        self.to_t=t
        