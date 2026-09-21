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
           for elem in G.mesh[top]:
               q.append(elem)                         
               
def move_energy(G):
    v=set()
    q=[]
    q.append(G[0])
    print(G[0].volt)
    while len(q)>0:
        top=q.pop(0)
        if top not in v:
            v.add(top)
            next=G[1].component.A
            print(G[1].component.name,next.volt,"+++++",next.current)
            q.append(next)
            