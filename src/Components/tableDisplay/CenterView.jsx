import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import {CustomTable,TableWrapper} from '../tables/CustomTable'
import {  photosTableColumns } from '../tables/Columns'


const CenterView = () => {
  const [isLoading,setIsLoading] = useState(false)
  const [photos, setPhotos] = useState([])


  useEffect(()=>{
    const fetchPhotos = async ()  => {
          setIsLoading(true)
        try {
          const res = await axios.get("https://jsonplaceholder.typicode.com/photos");

          setPhotos(res?.data) 
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
          throw error
        }
          } 

        fetchPhotos()
  },[setPhotos])

  const tableData = photos?.map((f) => ({
      col1: f?.id,
      col2: f?.albumId,
      col3: `${f?.title.substr(0,20)}...`,
      col4: f?.thumbnailUrl,
  })) 

  return (  
    <CenterMain>
        <h4>Adroit Solutions Ltd Task</h4>
      
        <CenterBox>
          {isLoading ? "Loading..." :     
              <TableWrapper>
                <CustomTable data={tableData} columns={photosTableColumns}/>
              </TableWrapper>
          }
        </CenterBox>
    </CenterMain>
  )
}


const CenterMain = styled.div`
  h4{
      display: flex;
      justify-content:center ;
      align-items: center;
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      color: #1f2024;
  }
`
const CenterBox = styled.div`

`
export default CenterView