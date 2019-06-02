import React from 'react';
import loadable from '@loadable/component';

//TODO: especificar esqueleto para fallback
export const SmallQuestion = loadable(() => import('./SmallQuestion/SmallQuestion'), {
  fallback: (
    <div
      style={{
        width: '100%',
        height: '150px',
        backgroundColor: 'rgb(240,240,240)',
        borderRadius: '20px',
        margin: '10px',
      }}
    />
  ),
});

export const Question = loadable(() => import('./Question/Question'), {
  fallback: (
    <div>
      <div
        style={{
          width: '320px',
          height: '40px',
          backgroundColor: 'rgb(240,240,240)',
          marginBottom: '10px',
        }}
      />
      <div style={{ borderBottom: '1px solid rgb(240,240,240)', width: '100%' }} />
      <div className="row p-0 m-0">
        <div className="col-md-auto p-0 m-3">
          <div
            style={{
              width: '70px',
              height: '70px',
              backgroundColor: 'rgb(240,240,240)',
              borderRadiur: '10px',
              margin: '10px',
            }}
          />
        </div>
        <div className="col p-0 m-0">
          <div
            style={{
              width: '100%',
              height: '150px',
              backgroundColor: 'rgb(240,240,240)',
              borderRadiur: '10px',
              margin: '10px',
            }}
          />
        </div>
      </div>
    </div>
  ),
});

export const UserQuestions = loadable(() => import('./Question/UserQuestions'));
