"use client"
import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import Loadmore from "@/components/Loadmore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type ProjectsSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean,
      hasNextPage: boolean,
      startCursor: string,
      endCursor:string
    }
  }
}

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
}

type Props = {
  searchParams: SearchParams
}

//fornce dynamic pag stuffs
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category,endcursor } }: Props) => {
  //const data = await fetchAllProjects() as ProjectsSearch // before (get all data without filtering)
  const data = await fetchAllProjects(category as string,endcursor as string) as ProjectsSearch
  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No project found,go create same first</p>
      </section>
    )
  }
  //pag stuff
  const pagination = data?.projectSearch?.pageInfo;
  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {
          projectsToDisplay.map(({ node }:{node:ProjectInterface}) => (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy?.name}
              avatarUrl={node?.createdBy?.avatarUrl}
              userId={node?.createdBy?.id}
            />
          ))
        }
      </section>
      <Loadmore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
   )
}
 
export default Home;