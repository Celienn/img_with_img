import math
c1 = (10,51,175)
c2 = (10,51,175)

dist = math.sqrt( (c1[0]-c2[0])**2 + (c1[1]-c2[1])**2 + (c1[2]-c2[2])**2 )
print(dist)

import sys

try :
    if(sys.argv[1]) :
        print("AH ya un argument")
except:
    print("nop ya r")