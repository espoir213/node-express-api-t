import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain, param } from 'express-validator';
class Validator {
  /**
   * validation entity
   */
  public validationEntity(errors: any[]) {
    const invalideProperty = [];
    errors.map(element => {
      const obj = {
        property: element.property,
        constraints: element.constraints,
      };
      invalideProperty.push(obj);
    });
    return invalideProperty;
  }

  /**
   * functions that takes a schema (= Validation Chain), checks if the rules are verified, and a send the errors if there is some
   * @param schemas Validation Chains
   * @returns errors if there are
   */
  public validate(schemas: ValidationChain[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(schemas.map(schema => schema.run(req)));

      const result: any = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }

      const errors: any[] = result.array();
      return res.status(422).json(errors);
    };
  }

  /**
   * validator reuquest by id
   */
  public idSpecifiedRule(): ValidationChain[] {
    return [param('id').notEmpty().withMessage('id is required'), param('id').isNumeric()];
  }
}

export default Validator;
