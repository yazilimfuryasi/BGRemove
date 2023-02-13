from django.shortcuts import render
from .models import IMG
from rembg import remove
from PIL import Image
from django.http import HttpResponse, JsonResponse


def index(request):
    return render(request, "yeni.html")

# def yukle(request):
#     if request.method == "POST":
#         old = request.FILES.get("file")
#         print(old)
#         # remove(Image.open(old)).save(str(old).split(".")[0]+".png")
#         # IMG.objects.create(image=request.FILES.get("file"))
#     return render(request, "yeni.html")

def yukle(request):
    if request.method=="POST":
        print(request.POST)
        print(request.FILES)
        if request.FILES:
            # IMG.objects.create(image=request.FILES.get("file"))
            ids = IMG.objects.create(image=request.FILES["image"])
            return JsonResponse({"Message":"File Uploaded Successfully", "id": ids.id})
        return JsonResponse({"Message":"Failed"})
    return render(request, "yeni.html")

def bgremove(request):
    try:
        if request.method=="POST":
            print(request.POST)
            id = request.POST.get("id")
            img = IMG.objects.filter(id=id).first()
            print(img)
            nameparse = str(img).split(".")[0] + ".png"
            print(nameparse)
            newimgName = "static/newimg/" + nameparse.split("/")[-1]
            # print(newimgName)
            remove(Image.open(str(img))).save(newimgName)
            return JsonResponse({"Message":"BG Remove Successfully", "name": newimgName})
    except:
        return JsonResponse({"Message":"Failed"})
    return render(request, "yeni.html")
