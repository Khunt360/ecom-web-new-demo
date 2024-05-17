import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

const FilterAccordion = ({ accordionTitle, data,isMore }) => {
  return (
    <div className="filter-accordion">
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#panelsStayOpen-${accordionTitle.split(" ").join().replaceAll(",","")}`}
              aria-expanded="true"
              aria-controls={`panelsStayOpen-${accordionTitle.split(" ").join().replaceAll(",","")}`}
            >
              {accordionTitle}
            </button>
          </h2>
          <div
            id={`panelsStayOpen-${accordionTitle.split(" ").join().replaceAll(",","")}`}
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              {data?.map((item, i) => {
                return (
                  <>
                    <Formik
                      initialValues={{ remember: false }} // Make sure you define initial values
                      onSubmit={(values) => {
                        // Handle form submission
                      }}
                    >
                      <Form>
                        <div className="tu-check tu-checksm">
                          <Field
                            type="checkbox"
                            id={item.title}
                            name="remember"
                          />
                          <label htmlFor={item.title}> {item.title}</label>
                        </div>
                      </Form>
                    </Formik>
                    {/* <div className="CheckBoxSpacing">
                      <input className="checkboxsize" type="checkbox" id={item.title} name={item.title} value={item.title} /><label> {item.title}({item.stock})
                      </label></div> */}
                  </>
                );
              })}
              {isMore && <button className="outline-basic-btn">More +</button>}
              {/* <label className="container-check">One
                <input type="checkbox" checked="checked"/>
                  <span className="checkmark"></span>
              </label> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAccordion;
