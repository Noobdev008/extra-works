import { useState } from "react";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardImage from '../../assets/images/card.jpg';

const defaultState = {};

const DashboardView = ({
  title = "",
  users = [],
}) => {
  const [state, setState] = useState(defaultState);

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {users.map(user => (
        <Card sx={{ width: 345, m: 4, }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }}>{user.name[0]}</Avatar>}
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={user.name}
            subheader={user.email}
          />
          <CardMedia
            component="img"
            height="194"
            src={CardImage}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
};

export default DashboardView;