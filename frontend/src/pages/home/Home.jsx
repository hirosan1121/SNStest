import React from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TimeLine from '../../components/timeline/TimeLine';
import Rightbar from '../../components/rightbar/Rightbar';

export default function Home() {
  return (
    <>
        <Topbar />
        <div className="flex justify-center items-center; w-100%; bc-#f8fcff">;
          <Sidebar />
          <TimeLine />
          <Rightbar />
        </div>
    </>
    );
}
