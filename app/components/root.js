import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import AllCampuses from './all-campuses'
import SingleCampus from './single-campus'
import AddCampus from './add-campus'
import AllStudents from './all-students'
import SingleStudent from './single-student'
import AddStudent from './add-student'
import NotFound from './not-found'
import Home from './home'
import Footer from './footer'
import Navbar from './navbar'

const Root = () => {
  return (
    <HashRouter>
      <div>
        <nav>
          <Navbar />
        </nav>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/campuses' component={AllCampuses} />
            <Route path='/campuses/:campusId' component={SingleCampus} />
            <Route exact path='/students' component={AllStudents} />
            <Route path='/students/:studentId' component={SingleStudent} />
            <Route exact path='/add-new-student' component={AddStudent} />
            <Route exact path='/add-new-campus' component={AddCampus} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </main>

      </div >
    </HashRouter>
  )
}

export default Root