import type { RequestHandler } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';

type Empty = Record<string, never>;

export type RH<P extends ParamsDictionary = ParamsDictionary,
    ResB = unknown,
    ReqB = Empty,
    Q = Empty> = RequestHandler<P, ResB, ReqB, Q>;
