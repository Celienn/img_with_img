from PIL import Image
import sys
import os
import json

def resize_image(filename,resize=None) :
    img = Image.open(filename)
    if resize is not None :
         img = img.resize(resize,Image.ANTIALIAS)
    
    return img

tab = {}

for filename in os.listdir(os.getcwd() + "/ressource") :    
    img = resize_image(os.getcwd() + "/ressource/" + filename,(int(sys.argv[1]),sys.argv[2]))
    path = os.getcwd().split(filename)[0] + "/temp/" + filename.split(".")[0] + "_resize." + filename.split(".")[1]
    img.save(path) 
    colormy = (0,0,0)
    for h in range(0,img.size[1]) :
        for w in range(0,img.size[0]) : 
            colormy = (colormy[0] + img.getpixel((w,h))[0],colormy[1] + img.getpixel((w,h))[1],colormy[2] + img.getpixel((w,h))[2]) 
    colormy = (colormy[0]/(img.size[1]*img.size[0]),colormy[1]/(img.size[1]*img.size[0]),colormy[2]/(img.size[1]*img.size[0]))
    tab[filename] = [path,colormy]
    file = open("data.json","w+")
    file.write(json.dumps(tab,indent=4))
    file.close()