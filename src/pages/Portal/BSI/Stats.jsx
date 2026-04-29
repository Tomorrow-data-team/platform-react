import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { rgba } from "polished";
import {Check, Close} from '@mui/icons-material';
import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";

import getPlatformInfo from "@/utils/PlatformIcons";

const Typography = styled(MuiTypography)(spacing);

const illustrationCardStyle = (props) => css`
  ${props.illustration &&
  props.theme.palette.mode !== "dark" &&
  `
    background: ${rgba(props.theme.palette.primary.main, 0.125)};
    color: ${props.theme.palette.primary.main};
  `}
`;

const Card = styled(MuiCard)`
  position: relative;

  ${illustrationCardStyle}
`;

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const Chip = styled(MuiChip)`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)};

  span {
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

const BrandIcon = styled.img`
  vertical-align: middle;
  height: auto;
`;
const Brand = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 40px;
`;

const illustrationPercentageStyle = (props) => css`
  ${props.illustration &&
  props.theme.palette.mode !== "dark" &&
  `
    color: ${rgba(props.theme.palette.primary.main, 0.85)};
  `}
`;

const Percentage = styled(MuiTypography)`
  span {
    color: ${(props) => props.percentagecolor};
    background: ${(props) => rgba(props.percentagecolor, 0.1)};
    padding: 2px;
    border-radius: 3px;
    margin-right: ${(props) => props.theme.spacing(2)};
  }

  ${illustrationPercentageStyle}
`;

const IllustrationImage = styled.img`
  height: 120px;
  position: absolute;
  right: ${(props) => props.theme.spacing(1)};
  bottom: ${(props) => props.theme.spacing(1)};
  display: none;

  ${(props) => props.theme.breakpoints.between("xs", "lg")} {
    display: block;
  }

  @media (min-width: 1700px) {
    display: block;
  }
`;

const Stats = ({
  title,
  amount,
  chip,
  percentagetext,
  percentagecolor,
  illustration,
}) => {
  const brandIcon = getPlatformInfo(title)
  var str = title.split('_')
  str = str.map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
  return (
    <Card illustration={illustration}>
      <CardContent>
        <Typography variant="h6" mb={6}>
          {str}
        </Typography>
        <Typography variant="h3" mb={6}>
          <Box fontWeight="fontWeightRegular">{amount}</Box>
        </Typography>
        <Percentage
          variant="subtitle2"
          color="textSecondary"
          percentagecolor={percentagecolor}
          illustration={illustration}
        >
          Significant <span>{percentagetext?<Check />:<Close />}</span>
        </Percentage>
        {brandIcon && <Brand>
            <BrandIcon
              alt={title}
              src={brandIcon['src']}
              style={{ height: "30px" }}
            />
          </Brand>}
      </CardContent>

      {!!illustration && (
        <IllustrationImage src={illustration} alt="Illustration" />
      )}
    </Card>
  );
};

export default Stats;