from PIL import Image
import sys
import math
import json
import os

#2400 1600 : old resolution
Config = {
    "resolution" : 250,
    "pixelresolution" : 50,
}

try :
    Config["resolution"] = int(sys.argv[2])
except :
    pass
try :
    Config["pixelresolution"] = int(sys.argv[3])
except :
    pass

def resize_image(img,resize=None) :
    if resize is not None :
         img = img.resize(resize,Image.ANTIALIAS)
    
    return img
img = Image.open(sys.argv[1])
resolution = Config["resolution"]
trueresolution = (round(resolution*Config["pixelresolution"]), round( (resolution*Config["pixelresolution"]) / abs(img.size[0]/img.size[1])  ) + abs((round( (resolution*Config["pixelresolution"]) / abs(img.size[0]/img.size[1])  )%Config["pixelresolution"])-Config["pixelresolution"]))
print(trueresolution)
img = resize_image(img, trueresolution)
imgData = {}
for x in range(round(img.size[0]/Config["pixelresolution"])) :
    for y in range(round(img.size[1]/Config["pixelresolution"])) :
        colormy = (0,0,0)
        for w in range(Config["pixelresolution"]) :
            X = (abs(x)*Config["pixelresolution"])+w
            for h in range(Config["pixelresolution"]) :
                Y = (abs(y)*Config["pixelresolution"])+h
                #print(str(X) + " and " + str(Y))
                colormy = (colormy[0]+img.getpixel((X,Y))[0],colormy[1]+img.getpixel((X,Y))[1],colormy[2]+img.getpixel((X,Y))[2])
        colormy = (colormy[0]/img.size[0],colormy[1]/img.size[0],colormy[2]/img.size[0])
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
        #print(str(best) + " and " + str(data[filename][1])) 
        newImg = img
        for w in range(Config["pixelresolution"]) :
            X = (abs(x)*Config["pixelresolution"])+w
            for h in range(Config["pixelresolution"]) :
                Y = (abs(y)*Config["pixelresolution"])+h
                newImg.putpixel((X,Y),(round(best[1][0]),round(best[1][1]),round(best[1][2])))
        pasteImg = Image.open(best[0])
        newImg.paste(pasteImg,(X-w,Y-h))
filename = sys.argv[1].split("/")
filename = filename[len(filename)-1]
img.save(os.getcwd() + "/temp/" + "output_" + filename)
#img.save(sys.argv[1].split(filename)[0] + "output_" + filename)
