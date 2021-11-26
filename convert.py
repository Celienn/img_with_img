from PIL import Image
import sys
import math
import json
import os

def resize_image(img,resize=None) :
    if resize is not None :
         img = img.resize(resize,Image.ANTIALIAS)
    
    return img

img = Image.open(sys.argv[1])
img = resize_image(img,(2400,1600))
imgData = {}
for x in range(round(img.size[0]/50)) :
    for y in range(round(img.size[1]/50)) :
        colormy = (0,0,0)
        for w in range(50) :
            X = ((x)*50)+w
            for h in range(50) :
                Y = ((y)*50)+h
                colormy = (colormy[0]+img.getpixel((X,Y))[0],colormy[1]+img.getpixel((X,Y))[1],colormy[2]+img.getpixel((X,Y))[2])
        colormy = (colormy[0]/2500,colormy[1]/2500,colormy[2]/2500)
        imgData[str(x)+"x"+str(y)+"y"] = colormy
        data = open("data.json")
        data = json.load(data)
        olddist = 255**3
        best = []
        for filename in os.listdir(os.getcwd() + "/ressource") : 
            c1 = colormy
            c2 = data[filename][1]
            dist = math.sqrt( (c1[0]-c2[0])**2 + (c1[1]-c2[1])**2 + (c1[2]-c2[2])**2 )
            if dist < olddist :
                olddist = dist
                best = data[filename]
            if(dist==0):
                break
        print(str(best) + " and " + str(data[filename][1]))

filename = sys.argv[1].split("/")
filename = filename[len(filename)-1]
img.save(sys.argv[1].split(filename)[0] + "output_" + filename)