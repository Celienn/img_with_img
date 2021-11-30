from PIL import Image
import sys
import os
import json

def resize_image(filename,resize=None) :
    img = Image.open(filename)
    if resize is not None :
         img = img.resize(resize,Image.ANTIALIAS)
    
    return img

tab = None
file = open("data.json","r")
try:
    tab = json.loads(file.read())
except:
    tab = {}
file.close()

tab[int(sys.argv[1])] = {}

for filename in os.listdir(os.getcwd() + "/ressource") :
    size = (int(sys.argv[1]),int(sys.argv[1]))
    path = os.getcwd().split(filename)[0] + "/temp/" + filename.split(".")[0] + "_resize_" + str(size[0]) +"." + filename.split(".")[1]
    if(os.path.isfile(path)) :
        pass
    else :
        img = resize_image(os.getcwd() + "/ressource/" + filename,size)
        img.save(path) 
        colormy = (0,0,0)
        for h in range(0,img.size[1]) :
            for w in range(0,img.size[0]) : 
                colormy = (colormy[0] + img.getpixel((w,h))[0],colormy[1] + img.getpixel((w,h))[1],colormy[2] + img.getpixel((w,h))[2]) 
        colormy = (colormy[0]/(img.size[1]*img.size[0]),colormy[1]/(img.size[1]*img.size[0]),colormy[2]/(img.size[1]*img.size[0]))
        tab[size[0]][filename] = [path,colormy]
        file = open("data.json","w+")
        file.write(json.dumps(tab,indent=4))
        file.close()