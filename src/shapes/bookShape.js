import PropTypes from "prop-types";
import frontmatterShape from "./frontmatterShape";
import backmatterShape from "./backmatterShape";
import infoShape from "./infoShape";
import audioShape from "./audioShape";

export default PropTypes.shape({
  id: PropTypes.string,
  info: infoShape,
  audio: audioShape,
  frontmatter: frontmatterShape,
  backmatter: backmatterShape,
  chapters: PropTypes.arrayOf(PropTypes.string),
});
