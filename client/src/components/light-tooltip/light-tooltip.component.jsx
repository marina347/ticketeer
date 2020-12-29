import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "1.1rem",
  },
}))(Tooltip);

export default LightTooltip;
