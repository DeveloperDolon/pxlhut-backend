import catchAsync from "../../utiils/catchAsync";

const register = catchAsync(async (req, res) => {
    const {password, user: userData} = req.body;
});