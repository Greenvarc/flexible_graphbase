"use client"

import { ProjectInterface, SessionInterface } from '@/common.types'
import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Formfield from './Formfield'
import { categoryFilters } from '@/contants'
import CustomMenu from './CustomMenu'
import Button from './Button'
import { createNewProject, fetchToken, updateProject } from '@/lib/actions'
import { useRouter } from 'next/navigation'

type Props={
    type: string,
    session: SessionInterface,
    project?:ProjectInterface
}

function ProjectForm({ type, session,project }: Props) {
    //states 
    const router = useRouter();
    const [isSubmiting, setIsSubmiting] = useState(false)
    // all states were empy string,but on edit we must have prevous datas
    const [form, setForm] = useState({
        image:project?.image ||'' ,
        title:project?.title || '',
        description:project?.description || '',
        liveSiteUrl:project?.liveSiteUrl || '',
        githubUrl:project?.githubUrl || '',
        category:project?.category ||'',
    })
    //handlers
    const handleStateChange = (fieldname: string, value:string) =>{
        setForm((prevState) => ({
            ...prevState,
            [fieldname]:value // prev state, change field val to new val
        }))
    }

    //submit changes
    const handleSubmit =async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmiting(true);
        const { token } = await fetchToken();
        try {
            if (type === 'create') {
                //create project
                await createNewProject(form, session?.user?.id, token);

                //return home page
                router.push('/');
            }
            if (type === 'edit') {
                await updateProject(form, project?.id as string, token)
                //return home while succefull
                router.push('/');
            }
        } catch (error) {
            console.log('project upload(or edit) error', error);
        }finally {
            setIsSubmiting(false);
        }
     }


    const handleChangeimage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e?.target?.files?.[0];
        if (!file) return;
        if (!file.type.includes('image')) {
            return alert('please upload image file');
        }
        const reader = new FileReader();
        reader.readAsDataURL(file); // get url
        reader.onload = () => {
            const result = reader.result as string;
            //change state
            handleStateChange('image', result);
        }
    }


  return (
      <form
          onSubmit={handleSubmit}
          className='flexStart form'
      >
          <div className="flexStart form_image-container">
              <label htmlFor="poster" className='flexCenter form_image-label'>
                  {!form?.image && 'Choose a poster for your project'}
              </label>
              <input type="file" id='image' accept='image/*'
                  className='form_image-input'
                  onChange={handleChangeimage}
              />
              {form.image && <Image
                  src={form?.image}
                  className='sm:p-10 object-contain z-20'
                  alt='project poster'
                  fill
              />}
          </div>
          <Formfield
              title="Title"
              state={form?.title}
              placeholder="Flexible"
              setState={(value) => handleStateChange('title', value)}
          />
          <Formfield
              title="description"
              state={form?.description}
              placeholder="Showcase and discover remarkable developer project"
              setState={(value) => handleStateChange('description', value)}
          />
          <Formfield
              type='url'
              title="Website URL"
              state={form?.liveSiteUrl}
              placeholder="varchodi.site"
              setState={(value) => handleStateChange('liveSiteUrl', value)}
          />
          <Formfield
              type='url'
              title="GitHub Url"
              state={form?.githubUrl}
              placeholder="https://github.com/greenvarc/project"
              setState={(value) => handleStateChange('githubUrl', value)}
          />

          {/* custom inputs for category */}
          <CustomMenu
              title="Category"
              state={form.category}
              filters={categoryFilters}
              setState={(value) => handleStateChange('category', value)}
          />

          <div className="flexStart w-full">
              <Button
                  title={isSubmiting
                      ? `${type === 'create' ? 'Creating' : 'Editing'}`
                      : `${type === 'create' ? 'Create' : 'Edit'}`}
                  type="submit"
                  leftIcon={isSubmiting ? "" : '/plus.svg'}
                  isSubmiting={isSubmiting}
              />
          </div>
    </form>
  )
}

export default ProjectForm