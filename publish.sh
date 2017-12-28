read -p "Please insert npm OTP: " OTP_CODE

FLDRS=(
  packages/reflow-board
  packages/reflow-circuit
  packages/reflow-core
  packages/reflow-reporter
)

RWD=`pwd`

for f in ${FLDRS[@]}; do
  cd "$RWD/$f"
  npm publish --tag latest --otp=$OTP_CODE &
  cd $RWD
done
