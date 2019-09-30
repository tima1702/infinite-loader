import React, { useState, useCallback } from 'react';
import { InfiniteLoader, List } from 'react-virtualized';
import moment from 'moment';
import { Icon, message, Button } from 'antd';
import { useDispatch } from 'react-redux';

import ApiService from '../../Service/ApiService';
import * as auth from '../../Reducers/Auth/actions';
import './index.css';

function InfiniteScroll() {
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(auth.userLogOut());
  }, [dispatch]);

  const [list, setList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading] = useState(false);

  const loadNextPage = async () => {
    const countLoad = 10;
    const lenStart = list.length + 1;
    const lenStop = list.length + 1 + countLoad;
    ApiService.getData(lenStart, lenStop)
      .then((resp) => {
        const obj = JSON.parse(resp);
        setList([...list, ...obj.Data]);

        if (obj.Data.length < countLoad) setHasNextPage(false);
      })
      .catch((e) => {
        message.error('Error loading data.');
      });
  };

  const rowCount = hasNextPage ? list.length + 1 : list.length;

  const loadMoreRows = isNextPageLoading
    ? () => {
        return;
      }
    : loadNextPage;

  const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;

  const rowRenderer = ({ index, key, style }) => {
    let isLoading, id, title, startDate, stopDate;

    if (!isRowLoaded({ index })) {
      isLoading = true;
    } else {
      isLoading = false;
      id = list[index]['ID'];
      title = list[index]['Title'];
      startDate = moment(list[index]['Start']).format('MM.DD.YY hh:mm A');
      stopDate = moment(list[index]['End']).format('MM.DD.YY hh:mm A');
    }

    style = {
      ...style,
      display: 'flex',
      flexDirection: 'row',
    };

    return (
      <div key={key} style={style}>
        {isLoading ? (
          <div className="loader">
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <>
            <div className="card ">
              <div className="card-title">
                {id} {title}
              </div>
              <div className="card-date">
                <Icon type="calendar" className="card-date-icon" />
                <div>{startDate}</div>
                <div className="card-date-separator"> - </div>
                <div>{stopDate}</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  return (
    <div
      style={{
        display: 'flex',
        width: '600px',
        justifyContent: 'space-between',
        flexDirection: 'column',
        margin: 'auto',
      }}>
      <div className="top-block ">
        <Button
          type="primary"
          style={{ marginBottom: '20px' }}
          block
          onClick={() => {
            logout();
          }}>
          Logout
        </Button>
        <div className="loaded">Loaded: {list.length}</div>
      </div>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={rowCount}
        className="blockFocus">
        {({ onRowsRendered, registerChild }) => (
          <List
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            rowRenderer={rowRenderer}
            rowCount={rowCount}
            height={1000}
            rowHeight={90}
            width={600}
            className="scroll  parent-block"
          />
        )}
      </InfiniteLoader>
    </div>
  );
}

export default InfiniteScroll;
