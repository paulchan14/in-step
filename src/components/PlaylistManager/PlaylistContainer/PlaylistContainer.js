import React from 'react';
import MediaQuery from 'react-responsive';

import MobilePlaylist from '../../mobile/MobilePlaylist/MobilePlaylist';
import DesktopPlaylist from '../../desktop/DesktopPlaylist/DesktopPlaylist';


function PlaylistContainer(props) {
    const { playlist, removeSong } = props;

    return (
        <div>
        <MediaQuery query="(max-device-width: 1223px)">
            <MobilePlaylist removeSong={ removeSong } playlist={ playlist }/>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1224px)">
            <DesktopPlaylist removeSong={ removeSong } playlist={ playlist }/>
        </MediaQuery>
        </div>
    )
}

export default PlaylistContainer;

