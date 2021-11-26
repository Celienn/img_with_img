from PIL import Image
import sys

def resize_image(filename,resize=None) :
    img = Image.open(filename)
    if resize is not None :
         img = img.resize(resize,Image.ANTIALIAS)
    
    return img

img = resize_image(sys.argv[1],(25,25))
filename = sys.argv[1].split("/")
filename = filename[len(filename)-1]
img.save(sys.argv[1].split(filename)[0] + "output_" + filename)