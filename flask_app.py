# Flask App for CV Generation for Teaching Professionals
# Written by @sundeepkrv, https://github.com/sundeepkrv
import zipfile, time
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)


@app.route("/", methods = ["GET", "POST"])
def resumebuilder():
    if request.method == "POST":
        formdata = request.form.to_dict()
        # print(formdata)
        data = {}
        data.update(salutation = formdata['salutation'])
        data.update(fullname = formdata['fullname'])
        data.update(designation = formdata['designation'])
        data.update(department = formdata['department'])
        data.update(college = formdata['college'])
        data.update(address = formdata['address'])
        data.update(emails = [x.strip() for x in formdata['emails'].split(";")])
        data.update(contacts = [x.strip() for x in formdata['contacts'].split(";")])
        data.update(aboutme = formdata['aboutme'])
        data.update(linkedin = formdata['linkedin'])
        data.update(twitter = formdata['twitter'])
        data.update(facebook = formdata['facebook'])
        data.update(qualdict = {x:y for (x,y) in zip(formdata.keys(), formdata.values()) if 'qual' in x})
        data.update(expdict = {x:y for (x,y) in zip(formdata.keys(), formdata.values()) if 'exp' in x})
        data.update(vidwan = formdata['vidwan'])
        data.update(orcid = formdata['orcid'])
        data.update(webofscience = formdata['webofscience'])
        data.update(googlescholar = formdata['googlescholar'])
        data.update(scopus = formdata['scopus'])
        data.update(researchgate = formdata['researchgate'])
        data.update(nphd = formdata['nphd'])
        data.update(nmtech = formdata['nmtech'])
        data.update(nbtech = formdata['nbtech'])
        data.update(phdguided = [[x.strip() for x in y.split(",")] for y in formdata['phdguided'].split(";")])
        data.update(projects = [[x.strip() for x in y.split(",")] for y in formdata['projects'].split(";")])
        data.update(interests = [x.strip() for x in formdata['interestareas'].split(";")])
        data.update(evescourses = [x.strip() for x in formdata['evescourses'].split(";")])
        data.update(intjournals = [x.strip() for x in formdata['intjournalsdetails'].split(";")])
        data.update(natjournals = [x.strip() for x in formdata['natjournalsdetails'].split(";")])
        data.update(intconfs = [x.strip() for x in formdata['intconfdetails'].split(";")])
        data.update(natconfs = [x.strip() for x in formdata['natconfdetails'].split(";")])
        data.update(profsocieties = [x.strip() for x in formdata['profsocieties'].split(";")])
        data.update(achievements = [x.strip() for x in formdata['achievementsdetails'].split(";")])
        data.update(otherresp = [x.strip() for x in formdata['otherresponsibilities'].split(";")])
        data.update(adminpos = [x.strip() for x in formdata['adminposdetails'].split(";")])
        if request.files['photo']:
            file = request.files['photo']
            photoname = secure_filename(file.filename)
            file.save("static/profileimgs/"+photoname)
        else:
            photoname = "sampleprofileimg.png"
        savefile = render_template("downloadresume.html", data = data, photo = photoname)
        resumename = data['salutation'].strip() + data['fullname'].replace(" ", "")
        with open("static/resumes/"+resumename+".html", "w") as f:
            f.write(savefile)
        timestr = time.strftime("%Y%m%d-%H%M%S")
        with open("static/bkcopy/"+resumename+"-"+timestr+".html", "w") as f:
            f.write(savefile)
        with zipfile.ZipFile("static/resumes/"+resumename+".zip", "w") as zf:
            zf.write("static/resumes/"+resumename+".html", resumename+".html")
            zf.write("static/profileimgs/"+photoname, photoname)
        return render_template("resume.html", data = data, photo = photoname, download = resumename+".html")
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
