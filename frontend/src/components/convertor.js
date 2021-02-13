const { profile, artifact, job } = require('./../proto/api_pb.js');

export function profileFromJson(p){
    const j = new profile()
    j.setFullName(p.fullName)
    j.setUsername(p.username)
    j.setEmail(p.email)
    j.setPicture(p.picture)
    j.setBio(p.bio)
    j.setContent(p.content)
    j.setLinksList(p.linksList)
    j.setArtifactsList(
        p.artifactsList.map(a => {
            var art = new artifact();
            art.setTitle(a.title)
            art.setDescription(a.description)
            art.setLink(a.link)
            return art;
        }));
    j.setJobsList(
        p.linksList.map(a => {
            var art = new job();
            art.setDates(a.dates)
            art.setTitle(a.title)
            art.setCompany(a.company)
            art.setDescription(a.description)
            return art;
        }));
    return j
}
