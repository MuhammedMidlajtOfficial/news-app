import React from 'react'
import NewsGrid from '../NewsCard/NewsCard'
import TopicsFilter from '../TopicsFilter/TopicsFilter'

function HomeBody() {
  return (
    <div>
      <TopicsFilter />
      <NewsGrid />
    </div>
  )
}

export default HomeBody
