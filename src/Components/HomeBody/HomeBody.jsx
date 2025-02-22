import React from 'react'
import TopicsFilter from '../TopicsFilter/TopicsFilter'
import NewsGrid from '../NewsCard/NewsGrid'

function HomeBody() {
  return (
    <div>
      <TopicsFilter />
      <NewsGrid />
    </div>
  )
}

export default HomeBody
