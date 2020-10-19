import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
      width: "100%",
    },
    title: {
      color: theme.palette.primary.dark,
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
  })
);

interface imgListType {
  img: string;
  title?: string;
}

interface SingleLineGridListProps {
  imgList: imgListType[];
  deleteImg: (args: any) => void;
}
function SingleLineGridList({ imgList, deleteImg }: SingleLineGridListProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {imgList.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} style={{ height: "100%" }} />
            <GridListTileBar
              // title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton
                  aria-label={`star ${tile.title}`}
                  onClick={() => deleteImg(tile)}
                >
                  <DeleteForeverOutlinedIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default SingleLineGridList;
