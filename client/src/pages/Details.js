import React from 'react'
import ProjectDetailCard from '../cards-dir/ProjectDetailCard'
import { useParams } from 'react-router-dom';
const Details = () => {
  const {id} = useParams();
  return (
    <ProjectDetailCard id = {id}/>
  )
}

export default Details