
// import './App.css';
import React,{lazy, Suspense} from 'react';
import{  Switch, Route} from 'react-router-dom';
import Loading from './components/loading/loading';
import ErrorBoundary from './components/error-boundary/error-boundary';
const Questions = lazy(()=>import('./pages/QuestionCategory-Page/Questions'))
const IndividualCategoryQuestion = lazy(()=>import('./pages/IndividualCategory-Page/individualCategoryQuestion'))
const ListAnswerPage = lazy(()=>import('./pages/ListAnswer-Page/List-Answer-Page'))
const RenderQuestion = lazy(()=>import('./components/Render-Question-Page/render-question'))

function App() {
  return (
      <Switch>
        <ErrorBoundary>
        <Suspense fallback={
                    // --------------------------------------------------------
                    // ----- // ! Loading when waiting for data come back -----
                    // --------------------------------------------------------
                    <Loading/>

              }>
        <Route exact path="/listAllAnswers" component={ListAnswerPage}/>
        <Route exact path="/" component={Questions} />
        <Route exact path="/api/:dynamicCategories" component={IndividualCategoryQuestion} />
        <Route exact path="/api/:dynamicCategories/:DynamicQuestion" component={RenderQuestion}/>
        </Suspense>
        </ErrorBoundary>
      </Switch>
  );
}

export default App;
