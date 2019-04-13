import { connect } from "react-redux";
import Image from "./Image";

function mapStateToProps({ application }) {
  return {
    imagesLocation: `${application.assetsLocation}/images`,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Image);
