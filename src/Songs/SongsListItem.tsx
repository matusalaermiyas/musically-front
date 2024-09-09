import { Box, Button, Card, Text } from "rebass";
import { deleteSongRequest, Song } from "./songsSlice";
import { buttonGroupStyle, cardStyle, editButtonStyle } from "./styles";
import { useDispatch } from "react-redux";
import EditSong from "./EditSong";

import Dialog from "rc-dialog";
import { useState } from "react";

interface SongsListItemProps {
  song: Song;
}

const SongsListItem: React.FC<SongsListItemProps> = ({ song }) => {
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteSongRequest(id));
  };

  const handleEdit = () => {
    showDialog();
  };

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <>
      <Dialog
        visible={visible}
        onClose={hideDialog}
        title="Edit Song"
        closable={true}
        children={<EditSong songId={song._id} />}
      />

      <Card css={cardStyle}>
        <Box>
          <Text fontWeight="bold">{song.title}</Text>
          <Text>
            {song.artist?.name} - {song.album?.title} - {song.genre?.title}
          </Text>
        </Box>
        <Box css={buttonGroupStyle}>
          <Button onClick={handleEdit} css={editButtonStyle} variant="primary">
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(song._id)}
            variant="outline"
            color="red"
          >
            Delete
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default SongsListItem;
