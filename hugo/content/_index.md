+++
title = "epicportfol.io"
outputs = ["Reveal"]
+++


{{< figure src="logo.svg" height="550">}}
___by epic corp___
---

{{< figure src="screenshot1.png" height="550">}}

---
# Intro



|   |  |
|:------:|:------:|
 Angus   |  Our Team and Philosophy   |
 Josh   |  CI/CD & Back-end   |
 Kevin   |  Client Requirements   |
 Haohan   |  Design   |
 Philip   |  Front-end   |





---
## Integrate everything
{{< figure src="gh.svg" height="550">}}

---
## Integrate Everything
{{< figure src="gh-screenshot.png" height="550">}}

---
## Agile Mindset

"Make decisions and re-avaulate when more information comes to light"


---
## Adapting to Challenges
***Deployment***

Cloud Build -> GitHub Actions

***Database***

Cloud SQL -> Cloud Datastore

***Authentication***

DIY Login/Register (JWT) -> Firebase

***Design***

DIY components -> Material UI


---

# CI/CD

 - Robust 

 - Simple and integrated 

 - Easy to extend 

---

{{< figure src="pipeline-old.svg" height="500">}}

---

<div class="table">

|   | cloudbuild | gh actions | 
|:------:|:------:|:------:|
 reliable   |  ✓   |   ✓   |
 maintainability  |   ✗  |    ✓  | 
 extendable  |   ✗  |    ✓  |
 integrated   |  ✗  |   ✓  |

</div>

---

{{< figure src="workflows.yml.png" height="500">}}

---

# Rest services

*  manual  
*  manual documentation  
*  manual server interfaces 
*  manual clients  

---
```react

  componentDidMount() {
    fetch("https://api.example.com/items") // or is it /item?
      .then(res => res.json())
    //...
```
---
# GRPC + Proto
- Client + Server generation

```proto
/* upload service is used to upload static assets to gcs */
service upload {

    /* upload uploads a static asset to gcp and returns a url */
    rpc upload(uploadRequest) returns(uploadResponse);
}

message uploadRequest {
    string dataurl = 1;
}

message uploadResponse {
    string url = 1;
}
```

---

```react
const upload = new uploadClient('https://upload.epicportfol.io');
var request = new uploadRequest();
request.setDataurl(reader.result);
upload.upload(request, {}, function (err, response) {
    //...
```

---

### Automatic documentation
- [Link](https://docs.epicportfol.io/services/)
<div class="table">

|   |  |  | 
|:------:|:------:|:------:|
 {{< figure src="integration.png" height="300">}} | {{< figure src="index.png" width="400">}} | {{< figure src="upload.png" width="400">}}
 
 
 </div>
 
---

{{< figure src="pipeline.svg" height="500">}}


---

# Client requirements
- Project Goal
- Design
- Users
- Technology
- Potential users

---
# Design

1.  Brand
2.  Wireframes 
3.  Aesthetics  
4.  Material UI
 
---
# Brand

{{< figure src="logo-progress.png" height="500">}}

---
# Brand

{{< figure src="logo-current.png" height="500">}}

---
# Wireframes

The Homepage

{{< figure src="wireframe-homepage.png" >}}

---

{{< figure src="screenshot1.png" height="550">}}

---
# Wireframes

The Profile

{{< figure src="wireframe-profile.png" height="400" >}}

---

{{< figure src="joshcarp.png" height="550" >}}

---
# Aesthetics

What are the core values an ePortfolio platform needs?

*  Responsive  
*  Modern  
*  Familiar 
*  Intuitive

---
# Material UI

*  Responsive   ☑ 
*  Modern   ☑ 
*  Familiar   ☑ 
*  Intuitive   ☑ 

---
# Why React?

- Modularity suits development style
- Integrates with Material UI
- Industry’s most popular framework
 
 ---
# Editor 

{{< figure src="editmodaler.png" height="500" >}}

---
# Learn from User Interaction

{{< figure src="graph.png" height="400" >}}

---
# ___Pre order now!___

