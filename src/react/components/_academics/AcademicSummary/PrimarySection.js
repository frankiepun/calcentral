import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ValueOrDash from './ValueOrDash';

const propTypes = {
  section: PropTypes.object,
  canViewGrades: PropTypes.bool,
  showPoints: PropTypes.bool
};

const propTypesSingleSection = {
  klass: PropTypes.object,
  canViewGrades: PropTypes.bool,
  showPoints: PropTypes.bool,
  requirementsDesignation: PropTypes.string,
  units: PropTypes.string,
  lawUnits: PropTypes.string,
  grading: PropTypes.object,
  sectionLabel: PropTypes.string
};

const SingleSection = ({
  showPoints,
  canViewGrades,
  klass,
  requirementsDesignation,
  units,
  lawUnits,
  grading,
  sectionLabel}) => {
  return (
    <tr>
      <td>
        <a href={klass.url}>
          {klass.course_code}&nbsp;
          {sectionLabel &&
            <Fragment>
              {sectionLabel}&nbsp;
            </Fragment>
          }
          {klass.session_code &&
            <Fragment>
              (Session {klass.session_code})
            </Fragment>
          }
        </a>
      </td>
      <td>
        {klass.title}&nbsp;
        {requirementsDesignation &&
          <div className="cc-requirements-designation">
            {requirementsDesignation}
          </div>
        }
      </td>
      <td className="cc-text-right cc-academic-summary-table-units">
        <ValueOrDash value={units} />
      </td>
      {lawUnits &&
        <td className="cc-text-right cc-academic-summary-table-units">
          <ValueOrDash value={lawUnits} />
        </td>
      }
      <td>
        {canViewGrades && grading &&
          <ValueOrDash value={grading.grade} />
        }
      </td>
      <td>
        {canViewGrades && showPoints && grading &&
          <ValueOrDash value={grading.gradePointsAdjusted} />
        }
      </td>
    </tr>
  );
};

const PrimarySection = ({ section, canViewGrades, showPoints }) => {
  if (section.class.multiplePrimaries) {
    return section.class.sections.map((sek, index) => (
      <SingleSection
        key={index}
        showPoints={showPoints}
        canViewGrades={canViewGrades}
        klass={section.class}
        requirementsDesignation={section.requirementsDesignation}
        units={sek.units}
        lawUnits={section.lawUnits}
        grading={sek.grading}
        sectionLabel={sek.section_label} />
    ));
  }
  return <SingleSection
    showPoints={showPoints}
    canViewGrades={canViewGrades}
    klass={section.class}
    requirementsDesignation={section.requirementsDesignation}
    units={section.units}
    lawUnits={section.lawUnits}
    grading={section.grading}
    sectionLabel={null} />;
};

PrimarySection.propTypes = propTypes;
SingleSection.propTypes = propTypesSingleSection;

const mapStateToProps = ({ myStatus }) => {
  const { canViewGrades } = myStatus;
  return { canViewGrades };
};

export default connect(mapStateToProps)(PrimarySection);
