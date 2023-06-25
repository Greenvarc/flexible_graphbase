import { g, auth, config } from '@grafbase/sdk'

const User = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  kinkedinUrl: g.string().optional(),
  projects:g.relation(()=>Project).list().optional(),
})

const Project = g.model("Project", {
  title: g.string().length({ min: 3 }),
  description: g.string(),
  image: g.url(),
  liveSiteurl: g.url(),
  githuburl: g.url(),
  category: g.string().search(),
  createBy:g.relation(()=>User),
})

export default config({
  schema: g,
})
